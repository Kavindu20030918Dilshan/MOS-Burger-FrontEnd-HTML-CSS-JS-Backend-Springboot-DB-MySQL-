package edu.kavindu.service;

import edu.kavindu.dto.Orders;

import java.util.List;

public interface OrdersService {
    List<Orders> getAll();

    void add(Orders orders);

    List<Orders> searchByCustomerMobile(String customerMobile);

    List<Orders> getAllOrderReport();
}
