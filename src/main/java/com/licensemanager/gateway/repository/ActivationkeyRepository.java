package com.licensemanager.gateway.repository;

import com.licensemanager.gateway.domain.Activationkey;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Activationkey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActivationkeyRepository extends JpaRepository<Activationkey, Long> {
}
