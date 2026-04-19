import sys
import json
import pymysql
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.utils.class_weight import compute_class_weight
import numpy as np
import pickle
import os

# Define the model class (must be before loading)
class SeverityModel(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.fc = nn.Linear(input_dim, 4)
    def forward(self, x):
        return self.fc(x)

# Database connection
conn = pymysql.connect(
    host='localhost',
    user='root',
    password='Mof@keng2002.',   # replace with your MySQL password
    database='cyberdb'
)
cursor = conn.cursor()

model_path = 'severity_model.pt'
vectorizer_path = 'vectorizer.pkl'

if os.path.exists(model_path) and os.path.exists(vectorizer_path):
    # Load existing model
    with open(vectorizer_path, 'rb') as f:
        vectorizer = pickle.load(f)
    model = torch.load(model_path, weights_only=False)
    model.eval()
else:
    # Fetch incidents
    cursor.execute("SELECT title, description, severity FROM incidents")
    rows = cursor.fetchall()
    if len(rows) == 0:
        print(json.dumps({"error": "No training data"}))
        sys.exit(1)

    texts = [f"{r[0]} {r[1]}" for r in rows]
    severities = [r[2] for r in rows]
    severity_map = {'LOW':0, 'MEDIUM':1, 'HIGH':2, 'CRITICAL':3}
    y = [severity_map[s] for s in severities]

    # Vectorize text
    vectorizer = TfidfVectorizer(max_features=100)
    X = vectorizer.fit_transform(texts).toarray()
    X = torch.tensor(X, dtype=torch.float32)
    y = torch.tensor(y, dtype=torch.long)

    model = SeverityModel(X.shape[1])

    # Class weights to handle imbalance
    classes = np.unique(y.numpy())
    weights = compute_class_weight('balanced', classes=classes, y=y.numpy())
    class_weights = torch.tensor(weights, dtype=torch.float32)
    criterion = nn.CrossEntropyLoss(weight=class_weights)

    optimizer = optim.Adam(model.parameters(), lr=0.01)

    # Train (increase epochs for better learning)
    for epoch in range(200):
        optimizer.zero_grad()
        outputs = model(X)
        loss = criterion(outputs, y)
        loss.backward()
        optimizer.step()

    # Save model and vectorizer
    torch.save(model, model_path)
    with open(vectorizer_path, 'wb') as f:
        pickle.dump(vectorizer, f)

# Prediction with confidence
if len(sys.argv) > 1:
    input_text = sys.argv[1]
    X_input = vectorizer.transform([input_text]).toarray()
    X_input = torch.tensor(X_input, dtype=torch.float32)
    with torch.no_grad():
        outputs = model(X_input)
        probabilities = torch.softmax(outputs, dim=1)
        confidence, pred = torch.max(probabilities, 1)
        pred_class = pred.item()
        confidence_score = confidence.item() * 100
    rev_map = {0:'LOW', 1:'MEDIUM', 2:'HIGH', 3:'CRITICAL'}
    result = {
        "predicted_severity": rev_map[pred_class],
        "confidence": round(confidence_score, 2)
    }
    print(json.dumps(result), flush=True)
else:
    print(json.dumps({"error": "No input"}), flush=True)