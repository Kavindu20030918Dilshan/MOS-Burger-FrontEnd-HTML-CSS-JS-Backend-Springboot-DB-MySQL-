package edu.kavindu.controller;

import edu.kavindu.dto.Cart;
import edu.kavindu.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@CrossOrigin
public class CartController {
    final CartService service;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addToCart(@RequestBody Cart cart){
        service.addToCart(cart);
    }

    @GetMapping("/get-all")
    public List<Cart> getAll(){
        return service.getAll();
    }


    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteCart(@PathVariable Integer id){
        service.deleteCart(id);
    }

    @DeleteMapping("/delete-all")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteCart(){
        service.deleteAll();
    }
}
