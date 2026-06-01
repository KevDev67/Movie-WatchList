package com.moviewatchlist.server;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movie_data")
public class movieDataEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "movietitle", nullable = false)
  public String movieTitle;

  @Column(name = "movielength", nullable = false)
  public String movieLength;

  @Column(name = "movierating")
  public String movieRating;

  @Column(name = "date")
  public String date;

  @Column(name = "image")
  public String image;

  public movieDataEntity() {
  }

}
