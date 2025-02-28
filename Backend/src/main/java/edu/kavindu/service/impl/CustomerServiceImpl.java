package edu.kavindu.service.impl;

import edu.kavindu.dto.Customer;
import edu.kavindu.entity.CustomerEntity;
import edu.kavindu.repository.CustomerRepository;
import edu.kavindu.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    final CustomerRepository repository;
    final ModelMapper mapper;
    @Override
    public void addCustomer(Customer customer) {
        repository.save(mapper.map(customer, CustomerEntity.class));
    }

    @Override
    public List<Customer> getAll() {
        List<Customer> customerList = new ArrayList<>();
        List<CustomerEntity> customerEntities = repository.findAll();
        customerEntities.forEach(customerEntity -> {
            customerList.add(mapper.map(customerEntity,Customer.class));
        });

        return customerList;
    }

    @Override
    public Customer searchById(Integer id) {
        return mapper.map(repository.findById(id),Customer.class);
    }

    @Override
    public void deleteCustomer(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Customer searchByMobile(String mobile) {
        return mapper.map(repository.findByMobile(mobile),Customer.class);
    }

    @Override
    public void updateCustomer(Customer customer) {
        repository.save(mapper.map(customer,CustomerEntity.class));
    }
}
