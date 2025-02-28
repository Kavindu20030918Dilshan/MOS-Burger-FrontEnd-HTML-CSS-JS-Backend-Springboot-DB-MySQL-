package edu.kavindu.service;

import edu.kavindu.dto.Cart;

import java.util.List;

public interface CartService {

    void addToCart(Cart cart);

    List<Cart> getAll();


    void deleteCart(Integer id);

    void deleteAll();
}
