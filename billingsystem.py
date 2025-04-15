import pandas as pd
from datetime import datetime

# Sample menu (you can modify this according to your cafe's offerings)
MENU = {
    "Coffee": 3.50,
    "Latte": 4.00,
    "Cappuccino": 4.25,
    "Tea": 3.00,
    "Sandwich": 6.50,
    "Cake": 4.75,
    "Cookie": 2.00
}

def display_menu():
    print("\n=== Cafe Menu ===")
    for item, price in MENU.items():
        print(f"{item}: ${price:.2f}")
    print("=================\n")

def take_order():
    order = {}
    while True:
        display_menu()
        item = input("Enter item (or 'done' to finish): ").capitalize()
        
        if item.lower() == 'done':
            break
            
        if item not in MENU:
            print("Item not on menu. Please try again.")
            continue
            
        try:
            quantity = int(input(f"Enter quantity for {item}: "))
            if quantity <= 0:
                print("Please enter a positive quantity.")
                continue
        except ValueError:
            print("Please enter a valid number.")
            continue
            
        order[item] = order.get(item, 0) + quantity
    
    return order

def calculate_total(order):
    total = 0
    print("\n=== Order Summary ===")
    for item, quantity in order.items():
        subtotal = MENU[item] * quantity
        total += subtotal
        print(f"{item} x{quantity}: ${subtotal:.2f}")
    print(f"Total: ${total:.2f}")
    return total

def save_to_excel(order, total):
    
    # Prepare data for Excel
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    order_data = {
        "Timestamp": [timestamp],
        "Items": [", ".join([f"{item} x{qty}" for item, qty in order.items()])],
        "Total": [total]
    }
    
    # Create DataFrame
    df = pd.DataFrame(order_data)
    
    # Try to append to existing file, if it exists
    try:
        existing_df = pd.read_excel("cafe_billing_records.xlsx")
        updated_df = pd.concat([existing_df, df], ignore_index=True)
        updated_df.to_excel("cafe_billing_records.xlsx", index=False)
    except FileNotFoundError:
        # If file doesn't exist, create new one
        df.to_excel("cafe_billing_records.xlsx", index=False)

    print(f"\nOrder saved to cafe_billing_records.xlsx")

def main():
    print("Welcome to Cafe Billing System")
    
    while True:
        # Take order
        order = take_order()
        
        if not order:
            print("No items ordered.")
        else:
            # Calculate and display total
            total = calculate_total(order)
            
            # Save to Excel
            save_to_excel(order, total)
        
        # Ask if there's another customer
        continue_choice = input("\nAnother customer? (yes/no): ").lower()
        if continue_choice != 'yes':
            print("Thank you for using Cafe Billing System!")
            break

if __name__ == "__main__":
    # Make sure you have pandas installed: pip install pandas openpyxl
    try:
        main()
    except Exception as e:
        print(f"An error occurred: {e}")