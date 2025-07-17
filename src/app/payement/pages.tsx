import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "src/store";
import { clearCart } from "@/store/slices/cartSlice";
import { useCreditAction } from "@/store/slices/creditSlice";
import { addGame } from "@/store/slices/userSlice";

const YourComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const creditBalance = useSelector((state: RootState) => state.credit.balance);
  const cartItems = useSelector((state: RootState) => state.cart.panier);
  const totalPrice = cartItems.reduce((acc, game) => acc + game.price, 0);

  const handlePayWithCredit = () => {
    if (creditBalance >= totalPrice) {
      dispatch(useCreditAction(totalPrice));
      // Ajouter chaque jeu à la bibliothèque utilisateur
      cartItems.forEach((game) => {
        dispatch(addGame(game));
      });
      dispatch(clearCart());
      router.push("/payement/succes");
    } else {
      alert("Solde insuffisant, recharge ton crédit.");
    }
  };

  return (
    // Votre JSX ici
  );
};

export default YourComponent;
