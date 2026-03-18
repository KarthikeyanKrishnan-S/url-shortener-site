package com.example.urlshortener.config;

import com.example.urlshortener.model.ClickEvent;
import com.example.urlshortener.model.Url;
import com.example.urlshortener.repository.ClickEventRepository;
import com.example.urlshortener.repository.UrlRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDateTime;

@Configuration
public class SeedDataConfig {

    @Bean
    public CommandLineRunner loadData(UrlRepository urlRepository, ClickEventRepository clickEventRepository) {
        return args -> {
            if (urlRepository.count() == 0) {
                // Seed URL 1
                Url url1 = new Url();
                url1.setOriginalUrl("https://www.google.com");
                url1.setShortCode("googl1");
                url1.setClickCount(15);
                url1.setCreatedAt(LocalDateTime.now().minusDays(5));
                urlRepository.save(url1);

                // Add fake clicks
                for (int i = 0; i < 15; i++) {
                    ClickEvent click = new ClickEvent(url1.getId());
                    click.setClickedAt(LocalDateTime.now().minusDays(5).plusHours(i));
                    clickEventRepository.save(click);
                }

                // Seed URL 2
                Url url2 = new Url();
                url2.setOriginalUrl("https://www.facebook.com");
                url2.setShortCode("fb1234");
                url2.setClickCount(8);
                url2.setCreatedAt(LocalDateTime.now().minusDays(3));
                urlRepository.save(url2);

                for (int i = 0; i < 8; i++) {
                    ClickEvent click = new ClickEvent(url2.getId());
                    click.setClickedAt(LocalDateTime.now().minusDays(3).plusHours(i));
                    clickEventRepository.save(click);
                }

                // Seed URL 3
                Url url3 = new Url();
                url3.setOriginalUrl("https://www.wikipedia.org");
                url3.setShortCode("wiki99");
                url3.setClickCount(20);
                url3.setCreatedAt(LocalDateTime.now().minusDays(10));
                urlRepository.save(url3);

                for (int i = 0; i < 20; i++) {
                    ClickEvent click = new ClickEvent(url3.getId());
                    click.setClickedAt(LocalDateTime.now().minusDays(10).plusHours(i));
                    clickEventRepository.save(click);
                }
                
                // Seed URL 4
                Url url4 = new Url();
                url4.setOriginalUrl("https://react.dev");
                url4.setShortCode("reactj");
                url4.setClickCount(4);
                url4.setCreatedAt(LocalDateTime.now().minusDays(1));
                urlRepository.save(url4);

                for (int i = 0; i < 4; i++) {
                    ClickEvent click = new ClickEvent(url4.getId());
                    click.setClickedAt(LocalDateTime.now().minusHours(i));
                    clickEventRepository.save(click);
                }

                // Seed URL 5
                Url url5 = new Url();
                url5.setOriginalUrl("https://spring.io");
                url5.setShortCode("spring");
                url5.setClickCount(2);
                url5.setCreatedAt(LocalDateTime.now());
                urlRepository.save(url5);

                for (int i = 0; i < 2; i++) {
                    ClickEvent click = new ClickEvent(url5.getId());
                    click.setClickedAt(LocalDateTime.now());
                    clickEventRepository.save(click);
                }

                // Seed URL 6
                Url url6 = new Url();
                url6.setOriginalUrl("https://github.com");
                url6.setShortCode("github");
                url6.setClickCount(12);
                url6.setCreatedAt(LocalDateTime.now().minusDays(4));
                urlRepository.save(url6);

                for (int i = 0; i < 12; i++) {
                    ClickEvent click = new ClickEvent(url6.getId());
                    click.setClickedAt(LocalDateTime.now().minusDays(2).plusHours(i));
                    clickEventRepository.save(click);
                }

                // Seed URL 7
                Url url7 = new Url();
                url7.setOriginalUrl("https://stackoverflow.com");
                url7.setShortCode("stkofl");
                url7.setClickCount(30);
                url7.setCreatedAt(LocalDateTime.now().minusDays(7));
                urlRepository.save(url7);

                for (int i = 0; i < 30; i++) {
                    ClickEvent click = new ClickEvent(url7.getId());
                    click.setClickedAt(LocalDateTime.now().minusDays(6).plusHours(i));
                    clickEventRepository.save(click);
                }

                // Seed URL 8
                Url url8 = new Url();
                url8.setOriginalUrl("https://www.youtube.com");
                url8.setShortCode("ytube1");
                url8.setClickCount(10);
                url8.setCreatedAt(LocalDateTime.now().minusDays(2));
                urlRepository.save(url8);

                for (int i = 0; i < 10; i++) {
                    ClickEvent click = new ClickEvent(url8.getId());
                    click.setClickedAt(LocalDateTime.now().minusDays(1).plusHours(i));
                    clickEventRepository.save(click);
                }
            }
        };
    }
}
