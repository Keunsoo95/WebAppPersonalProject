package com.example.bucket_list_project.controller.bucketBoard;

import com.example.bucket_list_project.entity.Board.BucketBoard;
import com.example.bucket_list_project.entity.Board.ImgFile;
import com.example.bucket_list_project.service.bucketBoard.BucketService;
import com.example.bucket_list_project.service.bucketBoard.request.bucketBoard.BucketBoardRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/bucket")
@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*")
public class BucketBoardController {

    @Autowired
    private BucketService service;

    @ResponseBody
    @PostMapping(value = "/register",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public void registerBucket(@RequestPart(value = "fileList") MultipartFile file,
                               @RequestPart(value = "info") BucketBoardRequest boardRequest) {
        log.info("registerBucket: " + file);
        log.info("registerBucket: " + boardRequest);

        service.register(boardRequest, file);
    }

    @GetMapping("/list")
    public List<BucketBoard> bucketList(){
        log.info("bucketList");

        return service.list();
    }

    @GetMapping("/{bucketId}")
    public BucketBoard bucketRead(@PathVariable("bucketId") Long bucketId) {
        log.info("bucketRead " + bucketId);

        return service.bucketRead(bucketId);
    }

    @GetMapping("/imgDownLoad/{bucketId}")
    public ImgFile imgFileDownLoad(@PathVariable("bucketId") Long bucketId) {
        log.info("imgFileDownLoad" + bucketId);

        return service.imgFileDownload(bucketId);
    }

    @PutMapping("/{bucketId}")
    public void bucketListModify(@PathVariable("bucketId") Long bucketId, @RequestBody BucketBoard bucketBoard) {
        log.info("bucketListModify" + bucketId);

        bucketBoard.setBucketId(bucketId);
        service.bucketModify(bucketBoard);
    }

    @DeleteMapping("/{bucketId}")
    public void deleteBucketList(@PathVariable("bucketId") Long bucketId) {
        log.info("deleteBucketList" + bucketId);

        service.delete(bucketId);
    }

    @GetMapping("/categoryKind/{bucketCategory}")
    public List<BucketBoard> bucketListByCategory(@PathVariable("bucketCategory") String bucketCategory) {
        log.info("bucketListByCategory" + bucketCategory);

        return service.findBucketListByCategory(bucketCategory);
    }

    @PostMapping("/{userNickname}")
    public List<BucketBoard> bucketListByUserNickname(@PathVariable("userNickname") String userNickname) {
        log.info("bucketListByUserNickname" + userNickname);

        return service.findBucketListByUserNickname(userNickname);
    }

    @GetMapping("/search/{searchWord}")
    public List<BucketBoard> bucketListSearch(@PathVariable("searchWord") String searchWord) {
        log.info("bucketListSearch" + searchWord);

        return service.bucketLIstSearch(searchWord);
    }
}
