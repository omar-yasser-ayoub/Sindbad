import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useUser } from "@/state management/userInfo";
import CardImage from "./CardImage";
import CardPrice from "./CardPrice";
import CardMenu from "./CardMenu";

const cardConfig = {
  actions: {
    edit: [],
    delete: [],
  },
};

function TripCard({ data, fetchCardData, styles }) {
  const [openDialog, setOpenDialog] = useState("");
  const navigate = useNavigate();
  const { role, id } = useUser();

  return (
    <article
      className={`${styles.container} ${
        data.isInappropriate === true ? styles.inappropriate : styles.active
      }`}
    >
      <div className={styles.imageContainer}>
        <CardImage imageSrc={data.cardImage} altText={data.name} />
        <CardMenu
          data={data}
          config={cardConfig}
          role={role}
          id={id}
          cardType="transportation"
          fetchCardData={fetchCardData}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
      <div className={styles.detailsContainer}>
        <h4 className={styles.title}>{data.name}</h4>
        <div className="flex flex-col gap-1">
          <CardPrice price={data.price} />
          <Button
            onClick={() => navigate(`/app/transportation/${data._id}`)}
            className={`${styles.button} ${
              data.isInappropriate === true
                ? styles.buttonInappropriate
                : styles.buttonActive
            }`}
          >
            <p className={styles.buttonText}>Read more</p>
            <div className={styles.buttonIcon}>
              <ArrowRight size={13} />
            </div>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default TripCard;
