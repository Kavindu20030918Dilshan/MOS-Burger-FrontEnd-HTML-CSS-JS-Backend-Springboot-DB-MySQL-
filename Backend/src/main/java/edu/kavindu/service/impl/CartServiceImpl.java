package edu.kavindu.service.impl;

import edu.kavindu.dto.Cart;
import edu.kavindu.entity.CartEntity;
import edu.kavindu.repository.CartRepository;
import edu.kavindu.service.CartService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    final CartRepository repository;
    final ModelMapper mapper;


    @Override
    public void addToCart(Cart cart) {
        repository.save(mapper.map(cart , CartEntity.class));
    }

    @Override
    public List<Cart> getAll() {
       List<Cart> cartList = new ArrayList<>();
       List<CartEntity> cartEntities = repository.findAll();
       cartEntities.forEach(cartEntity -> {
           cartList.add(mapper.map(cartEntity,Cart.class));
       });

       return cartList;
    }

    @Override
    public void deleteCart(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        repository.deleteAll();
    }


}
