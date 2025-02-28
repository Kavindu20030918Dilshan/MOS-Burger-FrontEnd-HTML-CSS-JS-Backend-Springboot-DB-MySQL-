package edu.kavindu.service;

import edu.kavindu.dto.Customer;

import java.util.List;

public interface CustomerService {
    public void addCustomer(Customer customer);

    List<Customer> getAll();

    Customer searchById(Integer id);

    void deleteCustomer(Integer id);

    Customer searchByMobile(String mobile);

    void updateCustomer(Customer customer);
}

