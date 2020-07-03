package com.licensemanager.gateway.repository;

import com.licensemanager.gateway.domain.Productservice;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Productservice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductserviceRepository extends JpaRepository<Productservice, Long> {
}
