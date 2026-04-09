package com.cyber.incident_intelligence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cyber.incident_intelligence.entity.Incident;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
}
