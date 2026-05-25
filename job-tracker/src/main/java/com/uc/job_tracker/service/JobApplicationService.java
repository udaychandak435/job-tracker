package com.uc.job_tracker.service;

import com.uc.job_tracker.entity.JobApplication;
import com.uc.job_tracker.entity.User;
import com.uc.job_tracker.repository.JobApplicationRepository;
import com.uc.job_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public JobApplication addJob(JobApplication job, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        job.setUser(user);
        return jobApplicationRepository.save(job);
    }

    public List<JobApplication> getMyJobs(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return jobApplicationRepository.findByUserId(user.getId());
    }

    public JobApplication updateJob(Long id, JobApplication updatedJob) {
        JobApplication existing = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        existing.setCompanyName(updatedJob.getCompanyName());
        existing.setRole(updatedJob.getRole());
        existing.setStatus(updatedJob.getStatus());
        existing.setNotes(updatedJob.getNotes());
        return jobApplicationRepository.save(existing);
    }

    public void deleteJob(Long id) {
        jobApplicationRepository.deleteById(id);
    }
}