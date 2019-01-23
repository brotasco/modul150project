package brotasco.modul254project_server.Controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import brotasco.modul254project_server.Entities.Status;

@RestController
@RequestMapping("/file")
public class FileController {

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST)
	public Status uploadProfilePicture(@RequestParam MultipartFile profilePic) {
		if (!profilePic.isEmpty()) {
			try {
				String uploadsDir = "/uploads/";
                if(! new File(uploadsDir).exists())
                {
                	System.out.println(uploadsDir);
                    new File(uploadsDir).mkdir();
                }


                String orgName = profilePic.getOriginalFilename();
                String filePath = uploadsDir + orgName;
                File dest = new File(filePath);
                System.out.println(dest.getPath());
                System.out.println(dest.getAbsolutePath());
                profilePic.transferTo(dest);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

}
