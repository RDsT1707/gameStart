import { addPurchasedGame } from "@/store/slices/creditSlice";

// ...

const handlePayWithCredit = () => {
  if (creditBalance >= totalPrice) {
    dispatch(useCreditAction(totalPrice));
    // Enregistrer chaque jeu dans la bibliothèque
    cartItems.forEach((game) => {
      dispatch(addPurchasedGame({ id: game.id, title: game.title, price: game.price }));
    });
    dispatch(clearCart());
    router.push("/payement/succes");
  } else {
    alert("Solde insuffisant, recharges ton crédit.");
  }
};
