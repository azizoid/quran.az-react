import React from "react";
import { Link } from "react-router-dom";

import TitleComponent from "../components/title.component";

const Empty = ({ alert }) => {
  return (
    <>
      <TitleComponent title={`Quran.az: Öz Kitabını Oxu`} />
      <div className="clearfix">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item active">Oxu:</li>
            <li className="breadcrumb-item ">
              <Link to="/36">Ya-sin surəsi</Link>
            </li>
            <li className="breadcrumb-item ">
              <Link to="/55">Ər-Rəhman surəsi</Link>
            </li>
            <li className="breadcrumb-item ">
              <Link to="/67">Əl-Mülk surəsi</Link>
            </li>
            <li className="breadcrumb-item ">
              <Link to="/2/255">Ayətul-Kürsi</Link>
            </li>
          </ol>
        </nav>
      </div>

      <div className="clearfix">
        {alert === "danger" ? (
          <h6 className="alert alert-danger text-right">
            Axtarışınızın <strong>uğurlu</strong> olması üçün aşağıdakı
            <strong>qaydalara</strong> riayət edin
          </h6>
        ) : (
          <h6 className="alert alert-success text-right">
            Axtarışınızın <strong>uğurlu</strong> olması üçün aşağıdakı
            <strong>qaydalara</strong> riayət edin
          </h6>
        )}

        <table cellPadding="10">
          <tbody>
            <tr>
              <td></td>
              <td>
                Saytdan istifadə qaydaları: <code>quran.az/96/1</code>
              </td>
            </tr>
            <tr>
              <td className="text-right align-top">Hərf səhvləri:</td>
              <td>
                Axtarış zamanı etdiyiniz qrammatik səhvlər sözlərin
                tapılmamasına səbəb ola bilər: <br />
                Məsələn: <code>mekke</code> əvəzinə <code>Məkkə</code> sözünü
                axtarın
              </td>
            </tr>
            <tr>
              <td className="text-right align-top">Fərqli söz və kəlmələr:</td>
              <td>
                Axtardığınız fikir tərcümədə olmaya bilər:
                <br /> Əlbəttə ki <code>namazı necə qılmaq lazımdır</code>{" "}
                cümləsi tərcümədə rast gəlinmir;
              </td>
            </tr>
            <tr>
              <td className="text-right align-top">Fərqli tərcümələr:</td>
              <td>
                Müəlliflərdən qaynaqlanaraq tərcümələrdəki sözlər və fikirlər
                dəyişik ola bilər;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Empty;
