package com.example.urlshortener.controller;

import com.example.urlshortener.model.ClickEvent;
import com.example.urlshortener.model.Url;
import com.example.urlshortener.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UrlController {

    @Autowired
    private UrlService urlService;

    // POST /api/urls
    @PostMapping("/api/urls")
    public ResponseEntity<Url> createShortUrl(@RequestBody Url requestUrl) {
        Url savedUrl = urlService.shortenUrl(requestUrl.getOriginalUrl());
        return new ResponseEntity<>(savedUrl, HttpStatus.CREATED);
    }

    // GET /api/urls
    @GetMapping("/api/urls")
    public List<Url> getRecentUrls() {
        return urlService.getAllUrls();
    }

    // GET /api/urls/{id}/analytics
    @GetMapping("/api/urls/{id}/analytics")
    public List<ClickEvent> getAnalytics(@PathVariable Long id) {
        return urlService.getAnalytics(id);
    }

    // GET /{shortCode}
    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirect(@PathVariable String shortCode) {
        Optional<Url> urlOptional = urlService.getUrlByShortCode(shortCode);

        if (urlOptional.isPresent()) {
            Url url = urlOptional.get();
            urlService.incrementClickCountAndSaveEvent(url);
            
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(url.getOriginalUrl()))
                    .build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
