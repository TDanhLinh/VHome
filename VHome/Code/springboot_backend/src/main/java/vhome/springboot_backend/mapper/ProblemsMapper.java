package vhome.springboot_backend.mapper;

import vhome.springboot_backend.dto.ProblemsDTO;
import vhome.springboot_backend.entity.Problems;

public class ProblemsMapper {
    public static ProblemsDTO mapToProblemsDTO(Problems problems) {
        return new ProblemsDTO(
                problems.getID(),
                problems.getName(),
                problems.getBuilding(),
                problems.getRoom(),
                problems.getDescription(),
                problems.getStatus(),
                problems.getType(),
                problems.getImplementer(),
                problems.getTerm()
        );
    }

    public static Problems mapToProblems(ProblemsDTO problemsDto) {
        return new Problems(
                problemsDto.getID(),
                problemsDto.getName(),
                problemsDto.getBuilding(),
                problemsDto.getRoom(),
                problemsDto.getDescription(),
                problemsDto.getStatus(),
                problemsDto.getType(),
                problemsDto.getImplementer(),
                problemsDto.getTerm()
        );
    }

    public static Problems updateProblems(Problems problems, ProblemsDTO problemsDTO) {
        problems.setName(problemsDTO.getName());
        problems.setBuilding(problemsDTO.getBuilding());
        problems.setRoom(problemsDTO.getRoom());
        problems.setDescription(problemsDTO.getDescription());
        problems.setStatus(problemsDTO.getStatus());
        problems.setType(problemsDTO.getType());
        problems.setImplementer(problemsDTO.getImplementer());
        problems.setTerm(problemsDTO.getTerm());

        return problems;
    }
}
