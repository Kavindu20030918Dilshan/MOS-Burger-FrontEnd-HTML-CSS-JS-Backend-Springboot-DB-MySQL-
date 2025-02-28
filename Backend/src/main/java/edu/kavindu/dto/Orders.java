package edu.kavindu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Orders {
    private int id;
    private String customerName;
    private String customerMobile;
    private String dateAndTime;
    private String items;
    private Double subTotal;
    private Double discount;
    private Double total;
}
