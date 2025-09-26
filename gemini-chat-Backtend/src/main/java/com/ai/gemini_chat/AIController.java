package com.ai.gemini_chat;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/qna")
public class AIController {

    @Autowired
    private final QnAService qnaService;

    @PostMapping("/ask")
    public ResponseEntity<String> askQuestion(@RequestBody Map<String,String> payload) {
        // Placeholder for AI processing logic
        String question = payload.get("question");
        String answer = qnaService.getAnswer(question);

        return ResponseEntity.ok(answer);
    }
}
