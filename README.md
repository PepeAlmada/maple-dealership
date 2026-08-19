# Maple Dealership

A ten-page website for a fictional car dealership in Kitchener, Ontario. Plain HTML, CSS and vanilla JavaScript — no build step, no dependencies.

**Live:** https://pepealmada.github.io/maple-dealership/

## Pages

| Page | What it covers |
| --- | --- |
| `index.html` | Hero, stock search, featured vehicles, buying process, finance and service teasers |
| `inventory.html` | All stock with live filtering by keyword, body, make, fuel, drivetrain, price and condition |
| `vehicle.html` | Vehicle detail, driven by `?stock=MD-0000` |
| `specials.html` | Current offers with their full conditions |
| `financing.html` | Payment calculator and credit application |
| `trade-in.html` | Trade appraisal request |
| `test-drive.html` | Test drive booking, preselects the vehicle from a detail page link |
| `service.html` | Posted service prices, booking form, warranty |
| `about.html` | History, staff, and the dealership's commitments |
| `contact.html` | Department lines, hours, directions, message form |
| `faq.html` | Grouped questions and answers |

## Design

Pine-ink and fog two-tone, Bricolage Grotesque for display, Public Sans for body, JetBrains Mono for every number. The recurring device is the **spec plate**: a stamped window sticker with a stock-number band and dashed monospace data rows. It carries vehicle cards, offers, staff, shop status and the full vehicle sidebar.

Vehicles are drawn as inline SVG silhouettes per body type, so there are no image files to load or break.

## Running it locally

```
python -m http.server 8765
```

Then open <http://127.0.0.1:8765/>. Opening `index.html` directly also works.

## Notes

Fictional dealership, built as a demonstration. Forms validate and confirm in the browser; there is no backend, so nothing is submitted anywhere. Vehicle stock lives in `assets/js/site.js`.
