package com.moviewatchlist.server;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class movieDataService {
  private final movieDataRepo mdr;

  public movieDataService(movieDataRepo mdr) {
    this.mdr = mdr;
  }

  public List<movieDataEntity> getAll() {
    return mdr.findAll();
  }

  public movieDataEntity insertDataValues(movieDataEntity mde) {
    return mdr.save(mde);
  }

  public Optional<movieDataEntity> returnDataById(Long id) {
    return mdr.findById(id);
  }

  public void deleteMovieById(Long id) {
    mdr.deleteById(id);
  }

}
