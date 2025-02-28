package edu.kavindu.service.impl;

import edu.kavindu.dto.Orders;
import edu.kavindu.entity.OrdersEntity;
import edu.kavindu.repository.OrdersRepository;
import edu.kavindu.service.OrdersService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OrdersServiceImpl implements OrdersService {
    final OrdersRepository repository;
    final ModelMapper mapper;
    @Override
    public List<Orders> getAll() {
        List<Orders> ordersList = new ArrayList<>();
        List<OrdersEntity> orderEntities = repository.findAll();
        orderEntities.forEach(ordersEntity -> {
            ordersList.add(mapper.map(ordersEntity, Orders.class));
        });

        return ordersList;
    }

    @Override
    public void add(Orders orders) {
        repository.save(mapper.map(orders, OrdersEntity.class));
    }

    @Override
    public List<Orders> searchByCustomerMobile(String customerMobile) {
        List<Orders> ordersList = new ArrayList<>();
        List<OrdersEntity> ordersEntities = repository.findByCustomerMobile(customerMobile);

        ordersEntities.forEach(ordersEntity -> {
            ordersList.add(mapper.map(ordersEntity, Orders.class));
        });

        return ordersList;
    }

    @Override
    public List<Orders> getAllOrderReport() {
        List<OrdersEntity> ordersEntities = repository.findAll();
        List<Orders> orderList = new ArrayList<>();
        ordersEntities.forEach(ordersEntity -> {
            orderList.add(mapper.map(ordersEntity,Orders.class));
        });

        return orderList;
    }
}
