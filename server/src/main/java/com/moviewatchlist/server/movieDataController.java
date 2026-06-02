package com.moviewatchlist.server;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/data")
@CrossOrigin(origins = "http://localhost:5173")
public class movieDataController {
  private final movieDataService mds;

  public movieDataController(movieDataService mds) {
    this.mds = mds;
  }

  @GetMapping
  public ResponseEntity<List<movieDataEntity>> getAllData() {
    return ResponseEntity.ok(mds.getAll());
  }

  @PostMapping
  public ResponseEntity<Object> insertMovieData(@RequestParam String movieTitle, @RequestParam String movieLength,
      @RequestParam(required = false) String rating, @RequestParam(required = false) String date,
      @RequestParam(required = false) MultipartFile image, @RequestParam(required = false) String watched_previously) {

    if ((movieTitle == null || movieTitle.isBlank()) && (movieLength == null || movieLength.isBlank())) {
      return ResponseEntity.status(400).body(Map.of("success", false, "message",
          "Both Movie Title and Length are Empty. Please fill them in", "data", ""));
    }

    if (movieLength == null || movieLength.isBlank()) {
      return ResponseEntity.status(400).body(Map.of("success", false, "message", "Movie Length Missing", "data", ""));
    }

    if (movieTitle == null || movieTitle.isBlank()) {
      return ResponseEntity.status(400).body(Map.of("success", false, "message", "Movie Title Missing", "data", ""));
    }

    movieDataEntity mde = new movieDataEntity();

    mde.movieTitle = movieTitle;
    mde.movieLength = movieLength;
    mde.movieRating = rating;
    mde.date = date;
    mde.watched_previously = watched_previously;

    if (image != null && !image.isEmpty()) {
      try {
        Path uploadsPath = Paths.get("uploads");
        Files.createDirectories(uploadsPath);
        String fileName = UUID.randomUUID() + "-" + image.getOriginalFilename();
        Path filePath = uploadsPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath);
        mde.image = "/uploads/" + fileName;
      } catch (IOException e) {
        return ResponseEntity.status(500)
            .body(Map.of("success", false, "message", "Failed to save image", "data", ""));
      }

    }

    return ResponseEntity.status(201)
        .body(Map.of("success", true, "message", "Successful", "data", mds.insertDataValues(mde)));

  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> getMovie(@PathVariable Long id) {
    Optional<movieDataEntity> mde = mds.returnDataById(id);

    if (mde.isEmpty()) {
      return ResponseEntity.status(404).body(Map.of(
          "success", false,
          "message", "data not found",
          "data", ""));
    }

    return ResponseEntity.ok(Map.of(
        "success", true,
        "message", "Movie found",
        "data", mde.get()));

  }

  @PatchMapping("/{id}")
  public ResponseEntity<Object> updateMovieData(@PathVariable Long id, @RequestParam String movieTitle,
      @RequestParam String movieLength,
      @RequestParam(required = false) String rating, @RequestParam(required = false) String date,
      @RequestParam(required = false) MultipartFile image, @RequestParam(required = false) String watched_previously) {

    Optional<movieDataEntity> movie = mds.returnDataById(id);

    if (movie.isEmpty()) {
      return ResponseEntity.status(404).body(Map.of("success", false, "message", "Movie Not Found", "data", "null"));
    }

    movieDataEntity mde = movie.get();

    mde.movieTitle = movieTitle;
    mde.movieLength = movieLength;
    mde.movieRating = rating;
    mde.date = date;
    mde.watched_previously = watched_previously;

    movieDataEntity updatedMovie = mds.insertDataValues(mde);

    return ResponseEntity.ok(Map.of(
        "success", true,
        "message", "updated data",
        "data", updatedMovie));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteDataById(@PathVariable Long id) {
    Optional<movieDataEntity> mde = mds.returnDataById(id);

    if (mde.isEmpty()) {
      ResponseEntity.status(404).body(Map.of(
          "success", false,
          "message", "Could not find Movie",
          "data", ""));
    }

    mds.deleteMovieById(id);

    return ResponseEntity.ok(Map.of(
        "success", true,
        "message", "Deletion Successful",
        "data", ""));

  }

}
