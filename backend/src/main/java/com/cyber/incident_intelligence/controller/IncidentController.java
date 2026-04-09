package com.cyber.incident_intelligence.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cyber.incident_intelligence.entity.Incident;
import com.cyber.incident_intelligence.repository.IncidentRepository;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    @Autowired
    private IncidentRepository incidentRepository;

    // GET all incidents
    @GetMapping
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    // GET incident by id
    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable Long id) {
        return incidentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST create new incident
    @PostMapping
    public ResponseEntity<Incident> createIncident(@RequestBody Incident incident) {
        Incident saved = incidentRepository.save(incident);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // PUT update incident
    @PutMapping("/{id}")
    public ResponseEntity<Incident> updateIncident(@PathVariable Long id, @RequestBody Incident incidentDetails) {
        return incidentRepository.findById(id)
                .map(incident -> {
                    incident.setTitle(incidentDetails.getTitle());
                    incident.setDescription(incidentDetails.getDescription());
                    incident.setSeverity(incidentDetails.getSeverity());
                    incident.setIncidentDate(incidentDetails.getIncidentDate());
                    incident.setStatus(incidentDetails.getStatus());
                    return ResponseEntity.ok(incidentRepository.save(incident));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE incident
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
        if (!incidentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        incidentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
