package vhome.springboot_backend.service;

import vhome.springboot_backend.dto.*;

import java.util.List;

public interface APIService {
    // Customer Service
    CustomerDTO createCustomer(CustomerDTO customerDTO);

    CustomerDTO getCustomerByID(int customerID);

    List<CustomerDTO> getAllCustomer();

    CustomerDTO updateCustomer(int customerID, CustomerDTO updatedCustomer);

    void deleteCustomer(int customerID);

    List<CustomerDTO> searchCustomers(String keyword);

    // CustomerServices Service
    ServicesDTO createServices(ServicesDTO servicesDTO);

    ServicesDTO getServicesByID(int servicesID);

    List<ServicesDTO> getAllServices();

    ServicesDTO updateServices(int servicesID, ServicesDTO updatedServices);

    void deleteServices(int servicesID);

    List<ServicesDTO> searchServices(String keyword);

    // Finance Service
    FinanceDTO createFinance(FinanceDTO financeDTO);

    FinanceDTO getFinanceByID(int financeID);

    List<FinanceDTO> getAllFinance();

    FinanceDTO updateFinance(int financeID, FinanceDTO updatedFinance);

    void deleteFinance(int financeID);

    List<FinanceDTO> searchFinances(String keyword);

    // Equipment Service
    EquipmentDTO createEquipment(EquipmentDTO equipmentDTO);

    EquipmentDTO getEquipmentByID(int equipmentID);

    List<EquipmentDTO> getAllEquipment();

    EquipmentDTO updateEquipment(int equipmentID, EquipmentDTO updatedEquipment);

    void deleteEquipment(int equipmentID);

    List<EquipmentDTO> searchEquipments(String keyword);

    // Problem Service
    ProblemsDTO createProblems(ProblemsDTO problemsDTO);

    ProblemsDTO getProblemsByID(int problemsID);

    List<ProblemsDTO> getAllProblems();

    ProblemsDTO updateProblems(int problemsID, ProblemsDTO updatedProblems);

    void deleteProblems(int problemsID);

    List<ProblemsDTO> searchProblems(String keyword);
}
