package com.cyber.incident_intelligence.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @PostMapping("/predict")
    public Map<String, String> predict(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        Map<String, String> response = new HashMap<>();
        try {
            String scriptPath = "C:/Projects/incident-intelligence/ai/train_and_predict.py";
            ProcessBuilder pb = new ProcessBuilder("python", scriptPath, text);
            pb.directory(new File("C:/Projects/incident-intelligence/ai"));
            Process p = pb.start();

            // Read stdout
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }
            String rawOutput = output.toString().trim();
            System.out.println("Raw output from Python: " + rawOutput);

            // Parse JSON using Jackson
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> pythonResult = mapper.readValue(rawOutput, new TypeReference<Map<String, Object>>() {});
            
            String severity = (String) pythonResult.get("predicted_severity");
            Double confidence = (Double) pythonResult.get("confidence");
            
            response.put("predicted_severity", severity);
            response.put("confidence", String.valueOf(confidence));

            // Read stderr for debugging
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(p.getErrorStream()));
            StringBuilder errorOutput = new StringBuilder();
            while ((line = errorReader.readLine()) != null) {
                errorOutput.append(line);
            }
            if (errorOutput.length() > 0) {
                System.err.println("Python stderr: " + errorOutput);
            }
        } catch (Exception e) {
            response.put("error", e.getMessage());
        }
        return response;
    }
}
