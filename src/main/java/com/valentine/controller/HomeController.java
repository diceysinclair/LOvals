package com.valentine.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Controller
public class HomeController {
    
    @GetMapping("/")
    public String home(Model model) {
        LocalDate valentinesDay = LocalDate.of(2026, 2, 14);
        LocalDate today = LocalDate.now();
        long daysUntil = ChronoUnit.DAYS.between(today, valentinesDay);
        
        model.addAttribute("daysUntil", daysUntil);
        model.addAttribute("girlfriendName", "Lovia");
        
        return "index";
    }
}
