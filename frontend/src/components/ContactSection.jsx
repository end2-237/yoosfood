import React from "react";
import { Phone, MapPin, Clock } from "lucide-react";

const ContactSection = ({ config, onOrderClick }) => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Restons en Contact
          </h2>
          <p className="text-xl text-amber-200">Commandez dès maintenant</p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Phone */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/15 transition-all">
            <Phone className="mx-auto mb-4 text-amber-300" size={40} />
            <h3 className="font-bold text-xl mb-2">Téléphone</h3>
            <p className="text-amber-200">{config.phone}</p>
            <p className="text-amber-200">{config.phone2}</p>
          </div>

          {/* Address */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/15 transition-all">
            <MapPin className="mx-auto mb-4 text-amber-300" size={40} />
            <h3 className="font-bold text-xl mb-2">Adresse</h3>
            <p className="text-amber-200">{config.address}</p>
          </div>

          {/* Hours */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/15 transition-all">
            <Clock className="mx-auto mb-4 text-amber-300" size={40} />
            <h3 className="font-bold text-xl mb-2">Horaires</h3>
            <p className="text-amber-200">Lun-Dim: 11h - 21h</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={onOrderClick}
            className="px-12 py-4 bg-white text-amber-900 rounded-full font-bold text-xl hover:bg-amber-50 transition-all hover:scale-105 shadow-2xl inline-flex items-center gap-3"
          >
            <span className="text-2xl">💬</span>
            Commander maintenant
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;