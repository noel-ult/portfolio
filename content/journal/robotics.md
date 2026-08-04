---
title: "Sensors, Signals & Noise: Filtering Telemetry during my Advanced Robotics Summer Internship"
date: "2026-06-10"
readingTime: 8
tags: ["Robotics", "C++", "Sensors", "Arduino", "Embedded Systems"]
coverImage: "journal/robotics.jpg"
summary: "Debugging hardware sensor jitter during my Advanced Robotics Summer Internship using C++ complementary filters to combine accelerometer and gyroscope data."
featured: true
---

# Context & Advanced Robotics Summer Internship Background

During my Advanced Robotics Summer Internship at **IEEE Sensors Council × Luminar Technolab**, I worked on telemetry signal extraction for mobile autonomous robots.

## The Technical Problem

Raw MPU-6050 IMU sensors exhibit high-frequency vibration noise from motor drives and low-frequency gyroscopic drift over extended operation runs.

## Sensor Complementary Filter Implementation

```cpp
float ComplementaryFilter::update(float accelAngle, float gyroRate, float dt) {
  // High-pass filter for gyro + Low-pass filter for accel
  angle = alpha * (angle + gyroRate * dt) + (1.0f - alpha) * accelAngle;
  return angle;
}
```

### Signal Filtering Results

- **Raw Accelerometer Jitter**: ±14.2 degrees spike under chassis motor vibration.
- **Filtered Complementary Angle**: ±0.8 degrees smooth tilt output.

> **Key Lesson**: Filtering noise at the sensor intake layer prevents exponential error accumulation in downstream navigation algorithms.
