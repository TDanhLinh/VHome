package vhome.springboot_backend.mapper;

import vhome.springboot_backend.dto.CustomerDTO;
import vhome.springboot_backend.entity.Customer;

public class CustomerMapper {
    public static CustomerDTO mapToCustomerDTO(Customer customer) {
        return new CustomerDTO(
                customer.getID(),
                customer.getName(),
                customer.getPhoneNumber(),
                customer.getEmail(),
                customer.getBirth(),
                customer.getRoom(),
                customer.getBuilding(),
                customer.getSex(),
                customer.getCccd(),
                customer.getHomeTown(),
                customer.getBankAccount(),
                customer.getBank(),
                customer.getJob(),
                customer.getCommunicator(),
                customer.getCommunicatorPhone()
        );
    }

    public static Customer mapToCustomer(CustomerDTO customerDto) {
        return new Customer(
                customerDto.getID(),
                customerDto.getName(),
                customerDto.getPhoneNumber(),
                customerDto.getEmail(),
                customerDto.getBirth(),
                customerDto.getRoom(),
                customerDto.getBuilding(),
                customerDto.getSex(),
                customerDto.getCccd(),
                customerDto.getHomeTown(),
                customerDto.getBankAccount(),
                customerDto.getBank(),
                customerDto.getJob(),
                customerDto.getCommunicator(),
                customerDto.getCommunicatorPhone()
        );
    }

    public static Customer updateCustomer(Customer customer, CustomerDTO customerDTO) {
        customer.setName(customerDTO.getName());
        customer.setPhoneNumber(customerDTO.getPhoneNumber());
        customer.setEmail(customerDTO.getEmail());
        customer.setBirth(customerDTO.getBirth());
        customer.setRoom(customerDTO.getRoom());
        customer.setBuilding(customerDTO.getBuilding());
        customer.setSex(customerDTO.getSex());
        customer.setCccd(customerDTO.getCccd());
        customer.setHomeTown(customerDTO.getHomeTown());
        customer.setBankAccount(customerDTO.getBankAccount());
        customer.setBank(customerDTO.getBank());
        customer.setJob(customerDTO.getJob());
        customer.setCommunicator(customerDTO.getCommunicator());
        customer.setCommunicatorPhone(customerDTO.getCommunicatorPhone());

        return customer;
    }
}
