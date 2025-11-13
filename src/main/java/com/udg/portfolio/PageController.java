package com.udg.portfolio;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

  @GetMapping("/")
  public String home() { return "index"; }

  @GetMapping("/about")
  public String about() { return "about"; }

  @GetMapping("/experience")
  public String experience() { return "experience"; }

  @GetMapping("/skills")
  public String skills() { return "skills"; }

  @GetMapping("/projects")
  public String projects() { return "projects"; }

  @GetMapping("/contact")
  public String contact() { return "contact"; }
}
