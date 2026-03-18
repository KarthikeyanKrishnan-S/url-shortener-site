package com.example.urlshortener;

import com.example.urlshortener.model.Url;
import com.example.urlshortener.service.UrlService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UrlShortenerApplicationTests {

    @Autowired
    private UrlService urlService;

    @Test
    void testUrlShorteningAndRetrieval() {
        Url shortened = urlService.shortenUrl("https://example.com");
        assertNotNull(shortened.getShortCode());
        assertEquals("https://example.com", shortened.getOriginalUrl());

        Optional<Url> retrieved = urlService.getUrlByShortCode(shortened.getShortCode());
        assertTrue(retrieved.isPresent());
        assertEquals(0, retrieved.get().getClickCount());

        urlService.incrementClickCountAndSaveEvent(retrieved.get());
        assertEquals(1, retrieved.get().getClickCount());
    }
}
