package vhome.springboot_backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vhome.springboot_backend.dto.*;
import vhome.springboot_backend.service.APIService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
@AllArgsConstructor
public class APIController {
    private APIService apiService;

    // Build Add Customer REST API
    @PostMapping("/customer/add")
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customerDTO) {
        CustomerDTO savedCustomer = apiService.createCustomer(customerDTO);
        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }

    //Build Get Customer REST API
    @GetMapping("/customer/get/{id}")
    public ResponseEntity<CustomerDTO> getCustomerByID(@PathVariable("id") int customerID) {
        CustomerDTO customerDTO = apiService.getCustomerByID(customerID);
        return ResponseEntity.ok(customerDTO);
    }

    //Build Get All Customer REST API
    @GetMapping("/customer/getAll")
    public ResponseEntity<List<CustomerDTO>> getALlCustomer() {
        List<CustomerDTO> customers = apiService.getAllCustomer();
        return ResponseEntity.ok(customers);
    }

    //Build Update Customer REST API
    @PutMapping("/customer/update/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable("id") int customerID,
                                                      @RequestBody CustomerDTO updatedCustomer) {
        CustomerDTO customerDTO = apiService.updateCustomer(customerID, updatedCustomer);
        return ResponseEntity.ok(customerDTO);
    }

    //Build Delete Customer REST API
    @DeleteMapping("/customer/delete/{id}")
    String deleteCustomer(@PathVariable("id") int customerID) {
        apiService.deleteCustomer(customerID);
        return "Customer with ID: " + customerID + " deleted successfully!";
    }

    //Build Search Customer REST API
    @GetMapping("/customer/search")
    public ResponseEntity<List<CustomerDTO>> searchCustomer(@RequestParam String keyword) {
        List<CustomerDTO> customers = apiService.searchCustomers(keyword);
        return ResponseEntity.ok(customers);
    }

    // Build Add Services REST API
    @PostMapping("/services/add")
    public ResponseEntity<ServicesDTO> createServices(@RequestBody ServicesDTO servicesDTO) {
        ServicesDTO savedServices = apiService.createServices(servicesDTO);
        return new ResponseEntity<>(savedServices, HttpStatus.CREATED);
    }

    //Build Get Services REST API
    @GetMapping("/services/get/{id}")
    public ResponseEntity<ServicesDTO> getServicesByID(@PathVariable("id") int servicesID) {
        ServicesDTO servicesDTO = apiService.getServicesByID(servicesID);
        return ResponseEntity.ok(servicesDTO);
    }

    //Build Get All Services REST API
    @GetMapping("/services/getAll")
    public ResponseEntity<List<ServicesDTO>> getALlServices() {
        List<ServicesDTO> services = apiService.getAllServices();
        return ResponseEntity.ok(services);
    }

    //Build Update Services REST API
    @PutMapping("/services/update/{id}")
    public ResponseEntity<ServicesDTO> updateServices(@PathVariable("id") int servicesID,
                                                      @RequestBody ServicesDTO updatedServices){
        ServicesDTO updatedService = apiService.updateServices(servicesID, updatedServices);
        return ResponseEntity.ok(updatedService);
    }

    //Build Delete Services REST API
    @DeleteMapping("/services/delete/{id}")
    String deleteServices(@PathVariable("id") int servicesID) {
        apiService.deleteServices(servicesID);
        return "Services with ID: " + servicesID + " deleted successfully!";
    }

    //Build Search Services REST API
    @GetMapping("/services/search")
    public ResponseEntity<List<ServicesDTO>> searchServices(@RequestParam String keyword) {
        List<ServicesDTO> services = apiService.searchServices(keyword);
        return ResponseEntity.ok(services);
    }

    // Build Add Finance REST API
    @PostMapping("/finance/add")
    public ResponseEntity<FinanceDTO> createFinance(@RequestBody FinanceDTO financeDTO) {
        FinanceDTO savedFinance = apiService.createFinance(financeDTO);
        return new ResponseEntity<>(savedFinance, HttpStatus.CREATED);
    }

    //Build Get Finance REST API
    @GetMapping("/finance/get/{id}")
    public ResponseEntity<FinanceDTO> getFinanceByID(@PathVariable("id") int financeID) {
        FinanceDTO financeDTO = apiService.getFinanceByID(financeID);
        return ResponseEntity.ok(financeDTO);
    }

    //Build Get All Finance REST API
    @GetMapping("/finance/getAll")
    public ResponseEntity<List<FinanceDTO>> getALlFinance() {
        List<FinanceDTO> finances = apiService.getAllFinance();
        return ResponseEntity.ok(finances);
    }

    //Build Update Finance REST API
    @PutMapping("/finance/update/{id}")
    public ResponseEntity<FinanceDTO> updateFinance(@PathVariable("id") int financeID,
                                                      @RequestBody FinanceDTO updatedFinance) {
        FinanceDTO financeDTO = apiService.updateFinance(financeID, updatedFinance);
        return ResponseEntity.ok(financeDTO);
    }

    //Build Delete Finance REST API
    @DeleteMapping("/finance/delete/{id}")
    String deleteFinance(@PathVariable("id") int financeID) {
        apiService.deleteFinance(financeID);
        return "Finance with ID: " + financeID + " deleted successfully!";
    }

    //Build Search Finance REST API
    @GetMapping("/finance/search")
    public ResponseEntity<List<FinanceDTO>> searchFinance(@RequestParam String keyword) {
        List<FinanceDTO> finances = apiService.searchFinances(keyword);
        return ResponseEntity.ok(finances);
    }

    // Build Add Equipment REST API
    @PostMapping("/equipment/add")
    public ResponseEntity<EquipmentDTO> createEquipment(@RequestBody EquipmentDTO equipmentDTO) {
        EquipmentDTO savedEquipment = apiService.createEquipment(equipmentDTO);
        return new ResponseEntity<>(savedEquipment, HttpStatus.CREATED);
    }

    //Build Get Equipment REST API
    @GetMapping("/equipment/get/{id}")
    public ResponseEntity<EquipmentDTO> getEquipmentByID(@PathVariable("id") int equipmentID) {
        EquipmentDTO equipmentDTO = apiService.getEquipmentByID(equipmentID);
        return ResponseEntity.ok(equipmentDTO);
    }

    //Build Get All Equipment REST API
    @GetMapping("/equipment/getAll")
    public ResponseEntity<List<EquipmentDTO>> getALlEquipment() {
        List<EquipmentDTO> equipments = apiService.getAllEquipment();
        return ResponseEntity.ok(equipments);
    }

    //Build Update Equipment REST API
    @PutMapping("/equipment/update/{id}")
    public ResponseEntity<EquipmentDTO> updateEquipment(@PathVariable("id") int equipmentID,
                                                    @RequestBody EquipmentDTO updatedEquipment) {
        EquipmentDTO equipmentDTO = apiService.updateEquipment(equipmentID, updatedEquipment);
        return ResponseEntity.ok(equipmentDTO);
    }

    //Build Delete Equipment REST API
    @DeleteMapping("/equipment/delete/{id}")
    String deleteEquipment(@PathVariable("id") int equipmentID) {
        apiService.deleteEquipment(equipmentID);
        return "Equipment with ID: " + equipmentID + " deleted successfully!";
    }

    //Build Search Equipment REST API
    @GetMapping("/equipment/search")
    public ResponseEntity<List<EquipmentDTO>> searchEquipment(@RequestParam String keyword) {
        List<EquipmentDTO> equipments = apiService.searchEquipments(keyword);
        return ResponseEntity.ok(equipments);
    }

    // Build Add Problems REST API
    @PostMapping("/problem/add")
    public ResponseEntity<ProblemsDTO> createProblems(@RequestBody ProblemsDTO problemsDTO) {
        ProblemsDTO savedProblems = apiService.createProblems(problemsDTO);
        return new ResponseEntity<>(savedProblems, HttpStatus.CREATED);
    }

    //Build Get Problems REST API
    @GetMapping("/problem/get/{id}")
    public ResponseEntity<ProblemsDTO> getProblemsByID(@PathVariable("id") int problemsID) {
        ProblemsDTO problemsDTO = apiService.getProblemsByID(problemsID);
        return ResponseEntity.ok(problemsDTO);
    }

    //Build Get All Problems REST API
    @GetMapping("/problem/getAll")
    public ResponseEntity<List<ProblemsDTO>> getALlProblems() {
        List<ProblemsDTO> problemss = apiService.getAllProblems();
        return ResponseEntity.ok(problemss);
    }

    //Build Update Problems REST API
    @PutMapping("/problem/update/{id}")
    public ResponseEntity<ProblemsDTO> updateProblems(@PathVariable("id") int problemsID,
                                                        @RequestBody ProblemsDTO updatedProblems) {
        ProblemsDTO problemsDTO = apiService.updateProblems(problemsID, updatedProblems);
        return ResponseEntity.ok(problemsDTO);
    }

    //Build Delete Problems REST API
    @DeleteMapping("/problem/delete/{id}")
    String deleteProblems(@PathVariable("id") int problemsID) {
        apiService.deleteProblems(problemsID);
        return "Problems with ID: " + problemsID + " deleted successfully!";
    }

    //Build Search Problems REST API
    @GetMapping("/problem/search")
    public ResponseEntity<List<ProblemsDTO>> searchProblems(@RequestParam String keyword) {
        List<ProblemsDTO> problemss = apiService.searchProblems(keyword);
        return ResponseEntity.ok(problemss);
    }
}
