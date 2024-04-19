import { Avatar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CardPreview({ cardSitting, back, ShowBrand }) {
  const { t } = useTranslation();
  const fontClassName =
    cardSitting.font === "Noto Sans Arabic"
      ? "!font-notoSansArabic"
      : cardSitting.font === "Amiri"
      ? "!font-amiri"
      : cardSitting.font === "Cairo"
      ? "!font-cairo"
      : "";

  const navToUrl = (des) => {
    window.location.href = des;
  };

  return (
    <div className="card md:h-[220px]   h-[180px] md:w-[380px] justify-center flex mx-auto md:mb-3 xs:mb-10 md:mb-3">
        <style>
  {`
    @media (max-width: 599px) {
      .card {
       margin:auto;
       max-width:380px
      }
    }
    @media (max-width: 320px) {
      .card {
       margin:auto;
       max-width:260px
      }
    }
  `}
</style>
      <figure
        className="relative flex justify-center shrink-0 mx-auto h-full w-full rounded-2xl overflow-hidden transition-colors"
        style={{ backgroundColor: cardSitting.color }}
      >
        <div
          className={"w-full h-full"}
          style={{ position: "relative", maxWidth: "480px" }}
        >
          {!back ? (
            <>
              <div className="absolute w-full h-full">
                {cardSitting.shape ? (
                  <img
                    src={cardSitting.shape}
                    height={200}
                    alt="gift card"
                    className="rounded-2xl object-fill w-full h-full absolute transition duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
                  />
                ) : null}
              </div>

              <div className={`absolute top-2 right-2 z-10`}>
                {cardSitting.brand.logoName ? (
                  <div className="rounded-full bg-black bg-opacity-40 p-1">
                    <img
                      src={cardSitting.brand.logoWithoutBackground}
                      alt={`${cardSitting.brand.logoName} logo`}
                      width={65}
                      height={65}
                      className="rounded-full object-fill transition duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
                    />
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <div
              className="flex flex-col justify-center items-center text-center p-4 gap-2 h-full"
              style={{ color: cardSitting.textColor }}
            >
              <Typography
                variant="h5"
                component="p"
                className={`${fontClassName} word-wrap p-4 transition-colors`}
                style={{ overflowWrap: "anywhere" }}
              >
                {cardSitting.message}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                className={`${fontClassName} p-4 transition-colors`}
              >
                {cardSitting.price} {t("currency")}
              </Typography>
              <div className="absolute bottom-4 left-4">
                <img
                  src="https://i.imgur.com/wkyCwby.png"
                  alt="logo"
                  width={100}
                />
              </div>
            </div>
          )}
        </div>
      </figure>

      {ShowBrand && (
        <div className="flex justify-between items-center w-full px-5 mt-4">
          <h3 className="flex items-center gap-2 text-xl">
            <Avatar
              src={
                cardSitting.logoImage
                  ? cardSitting.logoImage
                  : cardSitting.brand.logoWithoutBackground
              }
              alt={cardSitting.brand.logoName}
              className="[&_img]:object-contain object-contain cursor-pointer"
              sx={{ width: 60, height: 60 }}
              onClick={() => navToUrl(cardSitting.brand.brandUrl)}
            />
            {cardSitting.brand.logoName}
          </h3>
          <p className="text-xl">
            {cardSitting.price} {t("currency")}
          </p>
        </div>
      )}

      {/* unique code */}
      {cardSitting.uniqueCode && (
        <div className="flex justify-between items-center w-full px-5 mt-4">
          <p className="text-xl">{cardSitting.uniqueCode}</p>
          <p
            className={`${
              cardSitting.isPaid ? "text-green-500" : "text-red-500"
            }`}
          >
            {cardSitting.isPaid ? t("preview.ready") : t("preview.notReady")}
          </p>
        </div>
      )}
    </div>
  );
}