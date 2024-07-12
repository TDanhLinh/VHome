package vhome.springboot_backend.mapper;

import vhome.springboot_backend.dto.FinanceDTO;
import vhome.springboot_backend.entity.Finance;

public class FinanceMapper {
    public static FinanceDTO mapToFinanceDTO(Finance finance, String servicesName, String customerName, String room, String building) {
        return new FinanceDTO(
                finance.getID(),
                finance.getName(),
                finance.getServicesId(),
                servicesName,
                finance.getCreateDay(),
                finance.getCustomerId(),
                customerName,
                room,
                building,
                finance.getTerm(),
                finance.getMoney(),
                finance.getPaidMoney(),
                finance.getStatus()
        );
    }

    public static FinanceDTO mapToFinanceDTO(Finance finance) {
        return new FinanceDTO(
                finance.getID(),
                finance.getName(),
                finance.getServicesId(),
                null,
                finance.getCreateDay(),
                finance.getCustomerId(),
                null,
                null,
                null,
                finance.getTerm(),
                finance.getMoney(),
                finance.getPaidMoney(),
                finance.getStatus()
        );
    }

    public static Finance mapToFinance(FinanceDTO financeDto) {
        return new Finance(
                financeDto.getID(),
                financeDto.getName(),
                financeDto.getServicesId(),
                financeDto.getCreateDay(),
                financeDto.getCustomerId(),
                financeDto.getTerm(),
                financeDto.getMoney(),
                financeDto.getPaidMoney(),
                financeDto.getStatus()
        );
    }

    public static Finance updateFinance(Finance finance, FinanceDTO financeDTO) {
            finance.setCustomerId(financeDTO.getCustomerId());
            finance.setName(financeDTO.getName());
            finance.setServicesId(financeDTO.getServicesId());
            finance.setCreateDay(financeDTO.getCreateDay());
            finance.setCustomerId(financeDTO.getCustomerId());
            finance.setTerm(financeDTO.getTerm());
            finance.setMoney(financeDTO.getMoney());
            finance.setPaidMoney(financeDTO.getPaidMoney());
            finance.setStatus(financeDTO.getStatus());

        return finance;
    }
}
