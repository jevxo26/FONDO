export interface Vendor {
  id: number;
  name: string;
  type: string;
  location: string;
  status: string;
}

export const mockVendors: Vendor[] = [
  { id: 1, name: "Zaman Heritage", type: "Mughlai", location: "Banani, Dhaka", status: "Pending" },
  { id: 2, name: "Kacchi Bhai Express", type: "Biryani", location: "Dhanmondi", status: "Documents Pending" },
  { id: 3, name: "Spice Garden", type: "Indian", location: "Gulshan, Dhaka", status: "Pending" },
  { id: 4, name: "Sushi Master", type: "Japanese", location: "Baridhara, Dhaka", status: "Approved" },
  { id: 5, name: "Pizza House", type: "Italian", location: "Uttara, Dhaka", status: "Pending" },
  { id: 6, name: "Thai Orchid", type: "Thai", location: "Mohakhali, Dhaka", status: "Documents Pending" },
  { id: 7, name: "Burger King", type: "Fast Food", location: "Mirpur, Dhaka", status: "Approved" },
  { id: 8, name: "Chinese Wok", type: "Chinese", location: "Tejgaon, Dhaka", status: "Pending" },
  { id: 9, name: "Mediterranean Delight", type: "Mediterranean", location: "Banani, Dhaka", status: "Documents Pending" },
  { id: 10, name: "Tandoori Nights", type: "Pakistani", location: "Dhanmondi", status: "Pending" },
  { id: 11, name: "Noodle Bar", type: "Asian", location: "Gulshan, Dhaka", status: "Approved" },
  { id: 12, name: "Steak House", type: "American", location: "Baridhara, Dhaka", status: "Pending" },
  { id: 13, name: "Coffee Shop", type: "Cafe", location: "Uttara, Dhaka", status: "Documents Pending" },
  { id: 14, name: "Ice Cream Parlor", type: "Dessert", location: "Mohakhali, Dhaka", status: "Pending" },
  { id: 15, name: "Bakery Fresh", type: "Bakery", location: "Mirpur, Dhaka", status: "Approved" },
];

export const documents = [
  { name: "Trade_License_2024.pdf", size: "2.4 MB", date: "2024-01-15" },
  { name: "Tax_Certificate_2023.pdf", size: "1.8 MB", date: "2024-01-15" },
  { name: "Bank_Statement.pdf", size: "3.2 MB", date: "2024-01-14" },
  { name: "Menu_Catalog.pdf", size: "5.6 MB", date: "2024-01-14" },
  { name: "Health_Certificate.pdf", size: "1.2 MB", date: "2024-01-13" },
];

export const PAGE_SIZE = 5;
export const statuses = ["Pending", "Documents Pending", "Approved", "Rejected"];

export function getStatusVariant(status: string) {
  switch (status) {
    case "Approved": return "default";
    case "Rejected": return "destructive";
    case "Documents Pending": return "secondary";
    default: return "outline";
  }
}

export function getInitials(name: string) {
  return name.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2);
}
