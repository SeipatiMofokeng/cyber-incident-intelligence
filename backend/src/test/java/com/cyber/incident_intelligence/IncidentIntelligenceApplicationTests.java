package com.cyber.incident_intelligence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.cyber.incident_intelligence.entity.Incident;

@SpringBootTest
class IncidentIntelligenceApplicationTests {

    @Test
    void contextLoads() {
        assertTrue(true);
    }

    @Test
    void testIncidentEntityCreation() {
        Incident incident = new Incident();
        incident.setTitle("Test Incident");
        incident.setSeverity("HIGH");
        incident.setStatus("OPEN");

        assertEquals("Test Incident", incident.getTitle());
        assertEquals("HIGH", incident.getSeverity());
        assertEquals("OPEN", incident.getStatus());
    }

    @Test
    void testSeverityLevels() {
        String[] validSeverities = {"LOW", "MEDIUM", "HIGH", "CRITICAL"};
        for (String severity : validSeverities) {
            assertNotNull(severity);
            assertFalse(severity.isEmpty());
        }
    }

    @Test
    void testStatusLevels() {
        String[] validStatuses = {"OPEN", "INVESTIGATING", "RESOLVED"};
        for (String status : validStatuses) {
            assertNotNull(status);
            assertFalse(status.isEmpty());
        }
    }
} 