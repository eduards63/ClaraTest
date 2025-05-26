// Page Object Model for the Inventory Page
class InventoryPage {
    // Define page elements as functions for dynamic access
    elements = {
        itemsProduct: () => cy.get('.inventory_item'), // All product items on the inventory page
        sDropdown: () => cy.get('.product_sort_container'), // Sorting dropdown element
    };

    // Method to assert the number of products displayed matches the expected count
    productCount(expectedCount) {
        this.elements.itemsProduct().should('have.length', expectedCount);
    }

    // Method to sort products using the dropdown by the given option
    sortProduct(option) {
        this.elements.sDropdown().select(option);
    }

    // Method to open the details page for a specific product by name
    detailProduct(productName) {
        cy.get('.inventory_item').contains('.inventory_item_name', productName).click();
    }

    // Method to add a specific product to the cart by name
    addCart(productName) {
        cy.contains('.inventory_item_description', productName)
            .find('button')
            .contains('Add to cart')
            .click();
    }

    // Method to remove a specific product from the cart by name
    removeCart(productName) {
        cy.contains('.cart_item_label', productName)
            .find('button')
            .contains('Remove')
            .click();
    }

    // Method to navigate to the shopping cart page
    goCart() {
        cy.get('.shopping_cart_link').click();
    }
}

export default InventoryPage;