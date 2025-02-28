package edu.kavindu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Cart {
    private int id;
    private int qty;
    private int foodId;
    private String foodName;
    private String category;
    private Double price;
}
