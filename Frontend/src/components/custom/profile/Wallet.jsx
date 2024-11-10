import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { useUser } from "@/state management/userInfo";
import { redeemPoints } from "@/services/TouristApiHandler";

function Wallet({ userData, setUserData }) {
  const { role, id } = useUser();
  const handleRedeemPoints = async () => {
    try {
      const result = await redeemPoints(id);

      if (result.status === 200) {
        alert(result.data.message);
        setUserData((prevData) => ({
          ...prevData,
          wallet: result.wallet,
          loyaltyPoints: result.loyaltyPoints,
        }));
      } else {
        if (result.status === 400) alert("You don't have any points to redeem");
        else alert("An error occurred while redeeming points.");
      }
    } catch (error) {
      alert("An error occurred while redeeming points.");
    }
  };

  return (
    <section className="w-[280px] border border-neutral-300 rounded-md overflow-clip flex flex-col items-center shrink-0 p-6 bg-gradient-to-b from-neutral-200/60 to-light">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col w-full items-center gap-3">
          <div>
            <h4 className="text-center font-semibold text-base text-neutral-500 mb-1.5">
              Wallet
            </h4>
            <h3 className="font-inter font-bold text-xl break-all">
              {userData.wallet} EGP
            </h3>
          </div>
          {/* Loyalty Points Section */}
          <div className="flex flex-col items-center">
            <h4 className="text-center font-semibold text-base text-neutral-500 mb-1.5">
              Loyalty Points
            </h4>
            <h3 className="font-inter font-bold text-xl text-center">
              {userData.loyaltyPoints}
            </h3>
          </div>
        </div>

        <Button variant="rounded" onClick={handleRedeemPoints}>
          <p className="text-xs leading-[11px]">Redeem points</p>
          <div className="shrink-0 group-hover:text-secondary">
            <ArrowRight size={16} />
          </div>
        </Button>
      </div>
    </section>
  );
}

export default Wallet;
