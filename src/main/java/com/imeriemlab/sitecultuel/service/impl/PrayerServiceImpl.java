package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.PrayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PrayerServiceImpl implements PrayerService {

    private final Logger log = LoggerFactory.getLogger(PrayerServiceImpl.class);

}
