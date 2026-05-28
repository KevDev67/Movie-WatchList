package com.moviewatchlist.server;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

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
  public ResponseEntity<Object> insertMovieData(@Valid @RequestBody movieDataEntity mde) {
    if ((mde.movieTitle.equals("") || mde.movieTitle.isBlank())) {
      return ResponseEntity.status(400).body(Map.of(
          "success", false,
          "message", "Movie Title Is Blank",
          "data", null));
    }

    if ((mde.movieLength.equals("") || mde.movieLength.isBlank())) {
      return ResponseEntity.status(400).body(Map.of(
          "success", false,
          "message", "Movie Length Is Blank",
          "data", null));
    }

    return ResponseEntity.status(201).body(Map.of(
        "success", true,
        "message", "Created Successfully",
        "data", mds.insertDataValues(mde)));
  }

}
