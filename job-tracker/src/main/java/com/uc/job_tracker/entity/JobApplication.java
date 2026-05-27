package com.uc.job_tracker.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String role;
    private String status; // Applied, Interview, Offered, Rejected
    private LocalDate appliedDate;
    private String notes;
    private String location;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}