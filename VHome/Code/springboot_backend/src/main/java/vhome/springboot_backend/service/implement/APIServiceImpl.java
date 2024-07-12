package vhome.springboot_backend.service.implement;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import vhome.springboot_backend.dto.*;
import vhome.springboot_backend.entity.*;
import vhome.springboot_backend.exception.ResourceNotFoundException;
import vhome.springboot_backend.mapper.*;
import vhome.springboot_backend.repository.*;
import vhome.springboot_backend.service.APIService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static vhome.springboot_backend.constant.Constant.PHOTO_DIRECTORY;

@Service
@AllArgsConstructor
public class APIServiceImpl implements APIService {
    private CustomerRepo customerRepo;
    private ServicesRepo servicesRepo;
    private FinanceRepo financeRepo;
    private EquipmentRepo equipmentRepo;
    private ProblemsRepo problemsRepo;

    // Customer Services
    @Override
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        Customer customer = CustomerMapper.mapToCustomer(customerDTO);
        Customer savedCustomer = customerRepo.save(customer);
        return CustomerMapper.mapToCustomerDTO(savedCustomer);
    }

    @Override
    public CustomerDTO getCustomerByID(int customerID) {
        Customer customer = customerRepo.findByID(customerID);
        if (customer == null) {
            throw new ResourceNotFoundException("Customer is not exist with given ID: " + customerID);
        }
        return CustomerMapper.mapToCustomerDTO(customer);
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        List<Customer> customers = customerRepo.findAll();
        return customers.stream().map((customer) -> CustomerMapper.mapToCustomerDTO(customer))
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO updateCustomer(int customerID, CustomerDTO updatedCustomer) {
        Customer customer = customerRepo.findByID(customerID);
        if (customer == null) {
            throw new ResourceNotFoundException("Customer is not exist with given ID: " + customerID);
        }
        Customer afterUpdateCustomer = CustomerMapper.updateCustomer(customer, updatedCustomer);

        Customer updatedCustomerObj = customerRepo.save(afterUpdateCustomer);
        return CustomerMapper.mapToCustomerDTO(updatedCustomerObj);
    }

    @Override
    public void deleteCustomer(int customerID) {
        Customer customer = customerRepo.findByID(customerID);
        if (customer == null) {
            throw new ResourceNotFoundException("Customer is not exist with given ID: " + customerID);
        }
        customerRepo.deleteById(customerID);
    }

    @Override
    public List<CustomerDTO> searchCustomers(String keyword) {
        List<Customer> customers = customerRepo.searchCustomers(keyword);
        return customers.stream().map((customer) -> CustomerMapper.mapToCustomerDTO(customer))
                .collect(Collectors.toList());
    }

    // CustomerServices Service
    @Override
    public ServicesDTO createServices(ServicesDTO servicesDTO) {
        Customer customer = customerRepo.findByID(servicesDTO.getCustomerId());
        if (customer == null) {
            throw new ResourceNotFoundException("Customer is not exist with given ID: " + servicesDTO.getCustomerId());
        }
        Services services = ServicesMapper.mapToServices(servicesDTO);
        services.setPrice((services.getNewRecord() - services.getOldRecord()) * services.getUnitPrice());
        Services savedServices = servicesRepo.save(services);
        return ServicesMapper.mapToServicesDTO(savedServices);
    }

    @Override
    public ServicesDTO getServicesByID(int servicesID) {
        Services services = servicesRepo.findByID(servicesID);
        if (services == null) {
            throw new ResourceNotFoundException("Services is not exist with given ID: " + servicesID);
        }
        Customer customer = customerRepo.findByID(services.getCustomerId());
        if (customer == null) {
            // Handle null customer ID (e.g., throw exception)
            throw new ResourceNotFoundException("Customer is not exist with given ID: " + services.getCustomerId());
        }
        return ServicesMapper.mapToServicesDTO(services, customer.getName().trim());
    }

    @Override
    public List<ServicesDTO> getAllServices() {
        List<Services> services = servicesRepo.findAll();
        return services.stream().map((service) -> {
                    Customer customer = customerRepo.findByID(service.getCustomerId());
                    if (customer == null) {
                        // Handle null customer ID (e.g., throw exception)
                        throw new ResourceNotFoundException("Customer is not exist with given ID: " + service.getCustomerId());
                    }
                    return ServicesMapper.mapToServicesDTO(service, customer.getName().trim());
                })
                .collect(Collectors.toList());
    }

    @Override
    public ServicesDTO updateServices(int servicesID, ServicesDTO updatedServices) {
        Services services = servicesRepo.findByID(servicesID);
        if (services == null) {
            throw new ResourceNotFoundException("Services is not exist with given ID: " + servicesID);
        }
        //String imageURL = uploadPhoto(servicesID, image);
        Services afterUpdateServices = ServicesMapper.updateServices(services, updatedServices);
        Services updatedServicesObj = servicesRepo.save(afterUpdateServices);
        return ServicesMapper.mapToServicesDTO(updatedServicesObj);
    }

    @Override
    public void deleteServices(int servicesID) {
        Services services = servicesRepo.findByID(servicesID);
        if (services == null) {
            throw new ResourceNotFoundException("Services is not exist with given ID: " + servicesID);
        }
        servicesRepo.deleteById(servicesID);
    }

    @Override
    public List<ServicesDTO> searchServices(String keyword) {
        List<Services> services = servicesRepo.searchServices(keyword);
        return services.stream().map((service) -> {
                    Customer customer = customerRepo.findByID(service.getCustomerId());
                    if (customer == null) {
                        // Handle null customer ID (e.g., throw exception)
                        throw new ResourceNotFoundException("Customer is not exist with given ID: " + service.getCustomerId());
                    }
                    return ServicesMapper.mapToServicesDTO(service, customer.getName().trim());
                })
                .collect(Collectors.toList());
    }

    // Finance Services
    @Override
    public FinanceDTO createFinance(FinanceDTO financeDTO) {
        Services services = servicesRepo.findByID(financeDTO.getServicesId());
        if (services == null) {
            throw new ResourceNotFoundException("Services is not exist with given ID: " + financeDTO.getServicesId());
        }
        Customer customer = customerRepo.findByID(financeDTO.getCustomerId());
        if (customer == null) {
            // Handle null customer ID (e.g., throw exception)
            throw new ResourceNotFoundException("Customer is not exist with given ID: " + financeDTO.getCustomerId());
        }
        Finance finance = FinanceMapper.mapToFinance(financeDTO);
        finance.setMoney(services.getPrice());
        if(finance.getPaidMoney() < finance.getMoney()){
            finance.setStatus("unpaid");
        }
        else{
            finance.setStatus("paid");
        }
        Finance savedFinance = financeRepo.save(finance);
        return FinanceMapper.mapToFinanceDTO(savedFinance);
    }

    @Override
    public FinanceDTO getFinanceByID(int financeID) {
        Finance finance = financeRepo.findByID(financeID);
        if (finance == null) {
            throw new ResourceNotFoundException("Finance is not exist with given ID: " + financeID);
        }
        Services services = servicesRepo.findByID(finance.getServicesId());
        if (services == null) {
            throw new ResourceNotFoundException("Services is not exist with given ID: " + finance.getServicesId());
        }
        Customer customer = customerRepo.findByID(finance.getCustomerId());
        if (customer == null) {
            // Handle null customer ID (e.g., throw exception)
            throw new ResourceNotFoundException("Customer is not exist with given ID: " + finance.getCustomerId());
        }
        return FinanceMapper.mapToFinanceDTO(finance, services.getFeeType().trim(), customer.getName().trim(), customer.getRoom().trim(), customer.getBuilding().trim());
    }

    @Override
    public List<FinanceDTO> getAllFinance() {
        List<Finance> finances = financeRepo.findAll();
        return finances.stream().map((finance) -> {
                    Services services = servicesRepo.findByID(finance.getServicesId());
                    if (services == null) {
                        throw new ResourceNotFoundException("Services is not exist with given ID: " + finance.getServicesId());
                    }
                    Customer customer = customerRepo.findByID(finance.getCustomerId());
                    if (customer == null) {
                        // Handle null customer ID (e.g., throw exception)
                        throw new ResourceNotFoundException("Customer is not exist with given ID: " + finance.getCustomerId());
                    }
                    return FinanceMapper.mapToFinanceDTO(finance, services.getFeeType().trim(), customer.getName().trim(), customer.getRoom().trim(), customer.getBuilding().trim());
                })
                .collect(Collectors.toList());
    }

    @Override
    public FinanceDTO updateFinance(int financeID, FinanceDTO updatedFinance) {
        Finance finance = financeRepo.findByID(financeID);
        if (finance == null) {
            throw new ResourceNotFoundException("Finance is not exist with given ID: " + financeID);
        }
        Finance afterUpdateFinance = FinanceMapper.updateFinance(finance, updatedFinance);
        if(afterUpdateFinance.getPaidMoney() < afterUpdateFinance.getMoney()){
            afterUpdateFinance.setStatus("Chưa trả");
        }
        else{
            afterUpdateFinance.setStatus("Đã trả");
        }
        Finance updatedFinanceObj = financeRepo.save(afterUpdateFinance);
        return FinanceMapper.mapToFinanceDTO(updatedFinanceObj);
    }

    @Override
    public void deleteFinance(int financeID) {
        Finance finance = financeRepo.findByID(financeID);
        if (finance == null) {
            throw new ResourceNotFoundException("Finance is not exist with given ID: " + financeID);
        }
        financeRepo.deleteById(financeID);
    }

    @Override
    public List<FinanceDTO> searchFinances(String keyword) {
        List<Finance> finances = financeRepo.searchFinances(keyword);
        return finances.stream().map((finance) -> {
                    Services services = servicesRepo.findByID(finance.getServicesId());
                    if (services == null) {
                        throw new ResourceNotFoundException("Services is not exist with given ID: " + finance.getServicesId());
                    }
                    Customer customer = customerRepo.findByID(finance.getCustomerId());
                    if (customer == null) {
                        // Handle null customer ID (e.g., throw exception)
                        throw new ResourceNotFoundException("Customer is not exist with given ID: " + finance.getCustomerId());
                    }
                    return FinanceMapper.mapToFinanceDTO(finance, services.getFeeType().trim(), customer.getName().trim(), customer.getRoom().trim(), customer.getBuilding().trim());
                })
                .collect(Collectors.toList());
    }

    // Equipment Services
    @Override
    public EquipmentDTO createEquipment(EquipmentDTO equipmentDTO) {
        Equipment equipment = EquipmentMapper.mapToEquipment(equipmentDTO);
        Equipment savedEquipment = equipmentRepo.save(equipment);
        return EquipmentMapper.mapToEquipmentDTO(savedEquipment);
    }

    @Override
    public EquipmentDTO getEquipmentByID(int equipmentID) {
        Equipment equipment = equipmentRepo.findByID(equipmentID);
        if (equipment == null) {
            throw new ResourceNotFoundException("equipment is not exist with given ID: " + equipmentID);
        }
        return EquipmentMapper.mapToEquipmentDTO(equipment);
    }

    @Override
    public List<EquipmentDTO> getAllEquipment() {
            List<Equipment> equipments = equipmentRepo.findAll();
        return equipments.stream().map((equipment) -> EquipmentMapper.mapToEquipmentDTO(equipment))
                .collect(Collectors.toList());
    }

    @Override
    public EquipmentDTO updateEquipment(int equipmentID, EquipmentDTO updatedEquipment) {
        Equipment equipment = equipmentRepo.findByID(equipmentID);
        if (equipment == null) {
            throw new ResourceNotFoundException("equipment is not exist with given ID: " + equipmentID);
        }
        Equipment afterUpdateEquipment = EquipmentMapper.updateEquipment(equipment, updatedEquipment);

        Equipment updatedEquipmentObj = equipmentRepo.save(afterUpdateEquipment);
        return EquipmentMapper.mapToEquipmentDTO(updatedEquipmentObj);
    }

    @Override
    public void deleteEquipment(int equipmentID) {
        Equipment equipment = equipmentRepo.findByID(equipmentID);
        if (equipment == null) {
            throw new ResourceNotFoundException("Equipment is not exist with given ID: " + equipmentID);
        }
        equipmentRepo.deleteById(equipmentID);
    }

    @Override
    public List<EquipmentDTO> searchEquipments(String keyword) {
        List<Equipment> equipments = equipmentRepo.searchEquipments(keyword);
        return equipments.stream().map((equipment) -> EquipmentMapper.mapToEquipmentDTO(equipment))
                .collect(Collectors.toList());
    }

    // Problems Services
    @Override
    public ProblemsDTO createProblems(ProblemsDTO problemsDTO) {
        Problems problems = ProblemsMapper.mapToProblems(problemsDTO);
        Problems savedProblems = problemsRepo.save(problems);
        return ProblemsMapper.mapToProblemsDTO(savedProblems);
    }

    @Override
    public ProblemsDTO getProblemsByID(int problemsID) {
        Problems problems = problemsRepo.findByID(problemsID);
        if (problems == null) {
            throw new ResourceNotFoundException("problem is not exist with given ID: " + problemsID);
        }
        return ProblemsMapper.mapToProblemsDTO(problems);
    }

    @Override
    public List<ProblemsDTO> getAllProblems() {
        List<Problems> problemss = problemsRepo.findAll();
        return problemss.stream().map((problems) -> ProblemsMapper.mapToProblemsDTO(problems))
                .collect(Collectors.toList());
    }

    @Override
    public ProblemsDTO updateProblems(int problemsID, ProblemsDTO updatedProblems) {
        Problems problems = problemsRepo.findByID(problemsID);
        if (problems == null) {
            throw new ResourceNotFoundException("problem is not exist with given ID: " + problemsID);
        }
        Problems afterUpdateProblems = ProblemsMapper.updateProblems(problems, updatedProblems);

        Problems updatedProblemsObj = problemsRepo.save(afterUpdateProblems);
        return ProblemsMapper.mapToProblemsDTO(updatedProblemsObj);
    }

    @Override
    public void deleteProblems(int problemsID) {
        Problems problems = problemsRepo.findByID(problemsID);
        if (problems == null) {
            throw new ResourceNotFoundException("Problem is not exist with given ID: " + problemsID);
        }
        problemsRepo.deleteById(problemsID);
    }

    @Override
    public List<ProblemsDTO> searchProblems(String keyword) {
        List<Problems> problemss = problemsRepo.searchProblems(keyword);
        return problemss.stream().map((problems) -> ProblemsMapper.mapToProblemsDTO(problems))
                .collect(Collectors.toList());
    }

    // Handle upload image
    public String uploadPhoto(int id, MultipartFile file) {
        System.out.println("Saving picture for user ID: {" + id + "}");
        return photoFunction.apply(id, file);
    }

    // Get the extension file
    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    // Create new URI to store URI Image to Database
    private final BiFunction<Integer, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/services/image/" + filename).toUriString();
        } catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
