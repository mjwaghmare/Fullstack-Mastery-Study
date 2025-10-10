import './Sidebar.css'
import { useNavigate } from 'react-router-dom'
import { 
  Package, 
  Tag, 
  ShoppingCart, 
} from "lucide-react";

const items = [
    { key: "products", label: "Products", icon: Package },
    { key: "categories", label: "Categories", icon: Tag },
    { key: "orders", label: "Orders", icon: ShoppingCart },
]

export default function Sidebar({ active = 'products' }) {
  const navigate = useNavigate()

  const handleNavigation = (key) => {
    navigate(key === 'products' ? '/' : `/${key}`)
  }

  return (
    <aside className="sa-sidebar">
      <div className="sa-brand">
        <div className="sa-brand__text">
          <div className="sa-title">ShopAdmin</div>
          <div className="sa-sub">E-commerce Panel</div>
        </div>
      </div>

      <nav className="sa-nav">
        {items.map((item) => (
          <button
            key={item.key}
            className={"sa-item " + (item.key === active ? 'active' : '')}
            onClick={() => handleNavigation(item.key)}
            type="button"
          >
            <span className="sa-item__icon" aria-hidden>
              {item.icon && <item.icon size={18} />}
            </span>
            <span className="sa-item__label">{item.label}</span>
          </button>
        ))}
      </nav>

    </aside>
  )
}
