package com.licensemanager.gateway.repository;

import com.licensemanager.gateway.domain.Demandecle;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Demandecle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemandecleRepository extends JpaRepository<Demandecle, Long> {
}
