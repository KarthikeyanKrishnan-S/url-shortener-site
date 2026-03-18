package com.example.urlshortener.service;

import com.example.urlshortener.model.ClickEvent;
import com.example.urlshortener.model.Url;
import com.example.urlshortener.repository.ClickEventRepository;
import com.example.urlshortener.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    @Autowired
    private ClickEventRepository clickEventRepository;

    public Url shortenUrl(String originalUrl) {
        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setShortCode(generateShortCode());
        return urlRepository.save(url);
    }

    private String generateShortCode() {
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder shortCode = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            shortCode.append(characters.charAt(random.nextInt(characters.length())));
        }
        
        // Ensure uniqueness
        if (urlRepository.findByShortCode(shortCode.toString()).isPresent()) {
            return generateShortCode(); // recursive retry
        }
        return shortCode.toString();
    }

    public List<Url> getAllUrls() {
        return urlRepository.findAll();
    }

    public Optional<Url> getUrlByShortCode(String shortCode) {
        return urlRepository.findByShortCode(shortCode);
    }

    public void incrementClickCountAndSaveEvent(Url url) {
        url.setClickCount(url.getClickCount() + 1);
        urlRepository.save(url);

        ClickEvent event = new ClickEvent(url.getId());
        clickEventRepository.save(event);
    }

    public List<ClickEvent> getAnalytics(Long urlId) {
        return clickEventRepository.findByUrlId(urlId);
    }
}
