package com.uc.job_tracker.controller;

import com.uc.job_tracker.entity.JobApplication;
import com.uc.job_tracker.service.JobApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplication> addJob(
            @RequestBody JobApplication job,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(jobApplicationService.addJob(job, email));
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getMyJobs(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(jobApplicationService.getMyJobs(email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateJob(
            @PathVariable Long id,
            @RequestBody JobApplication job) {
        return ResponseEntity.ok(jobApplicationService.updateJob(id, job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        jobApplicationService.deleteJob(id);
        return ResponseEntity.ok("Job deleted successfully");
    }
}