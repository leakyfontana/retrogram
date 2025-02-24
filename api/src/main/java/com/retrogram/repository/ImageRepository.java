package com.retrogram.repository;

import com.retrogram.entity.Image;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface ImageRepository extends CrudRepository<Image, Long> {

    @Override
    List<Image> findAll();

    @Override
    Optional<Image> findById(Long id);

    List<Image> findByFileName(String fileName);

    List<Image> findByMediaType(String mediaType);

    List<Image> findByLocation(String location);
}